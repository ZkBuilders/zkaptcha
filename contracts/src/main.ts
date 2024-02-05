import { VerifyHash } from './VerifyHash.js';
import {
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
  CircuitString,
  MerkleMap,
  Poseidon,
} from 'o1js';


const useProof = false;

const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } =
  Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } =
  Local.testAccounts[1];

const secret = Field("123");
const captchaValue = CircuitString.fromString('Apple');

// ----------------------------------------------------

// create a destination we will deploy the smart contract to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

const initMerkleMap = new MerkleMap();
initMerkleMap.set(Field.from(1), Poseidon.hash([...CircuitString.fromString('value1').toFields(), secret]));
initMerkleMap.set(Field.from(2), Poseidon.hash([...CircuitString.fromString('value2').toFields(), secret]));
initMerkleMap.set(Field.from(3), Poseidon.hash([...CircuitString.fromString('value3').toFields(), secret]));
initMerkleMap.set(Field.from(4), Poseidon.hash([...CircuitString.fromString('value4').toFields(), secret]));

const zkAppInstance = new VerifyHash(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount);
    zkAppInstance.deploy();
    zkAppInstance.initState(initMerkleMap.getRoot(), senderAccount);
});
await deployTxn.prove();
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();



// ----------------------------------------------------

const txn1 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.checkMap(initMerkleMap.getWitness(Field.from(1)), Field.from(1), Poseidon.hash([...CircuitString.fromString('value1').toFields(), secret]));
});
await txn1.prove();
await txn1.sign([senderKey]).send();
console.log("Checked map Successfully!");

// wrong value
const txn2 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.checkMap(initMerkleMap.getWitness(Field.from(1)), Field.from(1), Poseidon.hash([...CircuitString.fromString('value2').toFields(), secret]));
});
await txn2.prove();
await txn2.sign([senderKey]).send();
console.log("Checked map failed!");