const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

//@dev - go to the terminal and run `node index.js` to get the merkle roots

// this are public Ethereum addresses and you can more of 
let WhitelistAddresses = [
    "0x...",
    "0x0716a17fbaee714f1e6ab0f9d59edbc5f09815c0",
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "0xf977814e90da44bfa03b6295a0616a897441acec",
    "0xe92d1a43df510f82c66382592a047d288f85226f"
]

// hashing them all using keccak256 to create our leaves
// Hash addresses to get the leaves
const leaves = WhitelistAddresses.map(addr => keccak256(addr))

//@dev - we can create the Merkle Tree and get our root hash by using MerkleTreeJS

// Create tree
const merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
// Get root
let rootHash = merkleTree.getRoot().toString('hex')

// Pretty-print tree
console.log(merkleTree.toString())

let address = WhitelistAddresses[0]
let hashedAddress = keccak256(address)
let proof = merkleTree.getHexProof(hashedAddress)
console.log(proof)

// Check proof
let e = merkleTree.verify(proof, hashedAddress, rootHash)
console.log(e) // this will returns true