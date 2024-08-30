# So.loyal - A loyalty-centric payment gateway

## 💡 Idea
This solution is inspired by the Web2 concept where merchants don't need a full-fledged website to collect payments. Instead, they can set up a dedicated payment page for their products and simply share a link with their customers. I tried to reimagined this model in a truly decentralized manner, where each payment page is securely stored on the blockchain, ensuring transparency and immutability.

The platform is designed with a strong focus on loyalty programs, drawing from real-world inspirations to enhance merchant sales. It integrates various loyalty and reward mechanisms, two of which are currently available: the "Buy X, Get 1 Free" program and "NFT Coupons."

The "Buy X, Get 1 Free" program is similar to the loyalty stamp cards used by popular brands like Starbucks or Subway. For example, when a customer purchases a coffee or sandwich, they receive a stamp on their loyalty card. After collecting a set number of stamps (e.g., 10), they earn a free item, such as a coffee or sandwich. I tried to capture the essence of this idea and brought it into so.loyal.

The second program, "NFT Coupons," mirrors the traditional coupon system found in many retail shops (mostly clothing shops I suppose?). Here, each time a purchase is made, an NFT is minted and sent to the customer’s wallet. Customers can accumulate these NFTs and redeem them for free products on subsequent visits.

## 💻 Technologies
The foundation of this project is based on Anchor (which btw has poor docs tbh). I used Rust to make smart contracts (they are pretty basic, nothing fancy). I used Postgres majorly to store the merchant metadata which is collected during the onboarding process, rest everything is decentralized apart from a few things here and there. For the web part, I made use of Next.js heavily. 
Let me list down everything I used: Anchor, Typescript, Rust, Nextjs, Tailwind, Metaplex, Shadcn, Clerk Auth, @solana/web3.js, Recharts

## 🛠️ Local Installation
- Must have Node.js, Rust (1.78.0), Solana CLI (1.18.18) and Anchor (v0.29.0)
- Will explain the procedure for the local setup soon

## 🔗 Connect 
- To connect with me on [X](https://x.com/m3hulsrivastava)
- To connect with me on [Linkedin](https://www.linkedin.com/in/mehulsrivastava1/)
