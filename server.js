const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()
const apiKey = process.env.API_KEY
const {utils} = require('ethers');

class Block{
    constructor(timestamp,blockReward){
        this.timeStamp=timeStamp;
        this.blockReward=blockReward
    }
}

const fetchData = async() =>{
    try{
        const listofBlocks = [];
        for(let blockNumber=2165403; blockNumber<2165410; blockNumber++){
        const apiUrl = `https://api.etherscan.io/api?module=block&action=getblockReward&blockno=${blockNumber}&apikey=${apiKey}`
        const response = await axios.get(apiUrl);
        const rewardEther = utils.formatEther(response.data.result.blockReward)
        const timeStamp = response.data.result.timeStamp
        const block=new Block(timeStamp,rewardEther)
        listofBlocks.push(block)
        }
        console.log(listofBlocks)
    }catch(error){
        console.error(error)
    }
}
fetchData()
app.listen(3000,()=>{
    console.log("Server is running")
})