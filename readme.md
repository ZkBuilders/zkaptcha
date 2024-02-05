## Zkaptcha

#### Current Implementation
 current implementation has a smart contract to store the hashes of the captcha, that can be updated by a method but owner only can call that method. The user can use the checkhash method to pass their value and compare it with the stored hash. We used merkle map to store hash of a corresponding captcha id. Currently the contact can be interacted by using `main.ts` 

#### MVP
