import { Field, SmartContract, state, State, method, MerkleMapWitness, Provable, PublicKey } from 'o1js';

export class VerifyHash extends SmartContract {
  @state(Field) mapRoot = State<Field>();
  @state(PublicKey) owner = State<PublicKey>();

  @method initState(initialRoot: Field, owner: PublicKey) {
    this.mapRoot.set(initialRoot);
    this.owner.set(owner);
  }

  @method update(
    previousRoot: Field,
    newRoot: Field,
  ) {
    const initialRoot = this.mapRoot.get();
    this.mapRoot.requireEquals(initialRoot);
    previousRoot.assertEquals(initialRoot);

    // check ownership
    const owner = this.owner.get();
    this.owner.requireEquals(owner);
    this.sender.assertEquals(owner);

    // update the state
    this.mapRoot.set(newRoot);
  }

  @method checkMap(
    keyWitness: MerkleMapWitness,
    keyToChange: Field,
    valueBefore: Field,
  ) {
    const initialRoot = this.mapRoot.get();
    this.mapRoot.requireEquals(initialRoot);
    

    // check the initial state matches what we expect
    const [ rootBefore, key ] = keyWitness.computeRootAndKey(valueBefore);
    Provable.log(rootBefore);
    Provable.log(key);
    Provable.log(keyToChange);

    rootBefore.assertEquals(initialRoot);
    key.assertEquals(keyToChange);
  }
}