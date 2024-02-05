## Zkaptcha

#### Current Implementation
 current implementation has a smart contract to store the hashes of the captcha, that can be updated by a method but owner only can call that method. The user can use the checkhash method to pass their value and compare it with the stored hash. We used merkle map to store hash of a corresponding captcha id. Currently the contact can be interacted by using `main.ts` 

#### MVP
![WhatsApp Image 2024-02-05 at 16 44 31](https://github.com/udhaykumarbala/zkaptcha/assets/24606613/13a88d97-1dbd-4b4f-9e79-f7119f96290c)

![WhatsApp Image 2024-02-05 at 16 45 11](https://github.com/udhaykumarbala/zkaptcha/assets/24606613/29ec1c81-dcbb-4b01-a3b8-0b1e53fab336)
