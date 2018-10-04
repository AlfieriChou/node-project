import SHA256 from 'crypto-js';

class Block{
    constructor(index,timestamp,amount,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.amount = amount;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256.SHA256(this.index + this.previousHash + this.timestamp + this.amount + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
    }
}



class BlockChain{
    constructor(){
        this.chain = [this.createAlfieriChouBlock()];
        this.difficulty = 5;
    }

    createAlfieriChouBlock(){
        return new Block(0,"2018-01-01","AlfieriChou Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i =1;i < this.chain.length;i++){
            
            const currBlock = this.chain[i];
            const preBlock = this.chain[i-1];

            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if(currBlock.previousHash !== preBlock.hash){
                return false;
            }
        }

        return true;
    }

}

export {
    Block,
    BlockChain
}