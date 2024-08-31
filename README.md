# So.loyal - A loyalty-centric payment gateway
### This is my first ever project in the web3 space!

## 💡 Idea
This solution is inspired by the Web2 concept where merchants don't need a full-fledged website to collect payments. Instead, they can set up a dedicated payment page for their products and simply share a link with their customers. I tried to reimagined this model in a truly decentralized manner, where each payment page is securely stored on the blockchain.

The "Buy X, Get 1 Free" program is similar to the loyalty stamp cards used by popular brands like Starbucks or Subway. For example, when a customer purchases a coffee or sandwich, they receive a stamp on their loyalty card. After collecting a set number of stamps (e.g., 10), they earn a free item, such as a coffee or sandwich.

The second program, "Soloyal Coupons" mirrors the traditional coupon system found in many retail shops (mostly clothing shops I suppose?). Here, each time a purchase is made, a token called "Soloyal Coupons (SLC) is minted and sent to the customer’s wallet. Customers can accumulate these tokens and redeem them for on their subsequent visits.

## 💻 Technologies
The foundation of this project is based on Anchor (which btw has very poor docs tbh). I used Rust to make smart contracts (they are pretty basic, nothing fancy). I used Postgres majorly to store the merchant metadata which is collected during the onboarding process, rest everything is decentralized apart from a few things. For the web part, I used Next.js heavily. 
Let me list down everything I used: Anchor, Typescript, Rust, Nextjs, Tailwind, Metaplex, Shadcn, Clerk Auth, @solana/web3.js, Recharts

## ❓ What's Next?
Two more programs are in the piepline one of which is very interesting called 'Collateral Pay'. In this, the user locks their SOL with so.loyal while merchant acquires the gain on the token. When the product price is recouped, the funds are released back to the user.

## 🛠️ Local Installation
- Must have Node.js, Rust (1.78.0), Solana CLI (1.18.18) and Anchor (v0.29.0)
- Will explain the procedure for the local setup soon

## 🔗 Connect 
- To connect with me on [X](https://x.com/m3hulsrivastava)
- To connect with me on [Linkedin](https://www.linkedin.com/in/mehulsrivastava1/)
