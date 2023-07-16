const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()
const apiKey = process.env.API_KEY
const createCSVwriter = require('csv-writer').createObjectCsvWriter
const {utils} = require('ethers');
class Block{
    constructor(timeStamp,blockReward){
        this.timeStamp=timeStamp;
        this.blockReward=blockReward
    }
}

const fetchData = async() =>{
    try{
        const listofBlocks = [];
        for(let blockNumber="Any Number"; blockNumber<"Any Number + Data required"; blockNumber++){
        const apiUrl = `https://api.etherscan.io/api?module=block&action=getblockReward&blockno=${blockNumber}&apikey=${apiKey}`
        const response = await axios.get(apiUrl);
        const rewardEther = (response.data.result.blockReward/Math.pow(10,18))
        const timeStamp = response.data.result.timeStamp
        const block=new Block(timeStamp,rewardEther)
        listofBlocks.push(block)
        }
        exportToCsv(listofBlocks)
    }catch(error){
        console.error(error)
    }
}
const exportToCsv = (data) => {
    console.log("Heyy")
    const csvWriter = createCSVwriter({
        path: 'block_data.csv',
        header: [
            {id : 'timeStamp', title : 'timeStamp'},
            {id : 'blockReward', title: 'blockReward'}
        ]
    });

    csvWriter
        .writeRecords(data)
        .then(() => {
            console.log('CSV file created successfully!');

        })
        .catch((error) => {
            console.error(error);
        });
}
(async() => {
    try{
        await fetchData()
        app.listen(3000,()=>{
            console.log("Server is running");
        })
    }catch(error){
        console.error(error)
    }
})()
