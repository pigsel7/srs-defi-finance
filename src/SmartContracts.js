import tokenABI from './assets/data/tokenABI.json';
import stakingABI from './assets/data/stakingABI.json';
import stakingV2ABI from './assets/data/stakingV2ABI.json';
import stakingV3ABI from './assets/data/stakingV3ABI.json';
import { ethers } from "ethers";
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import bigInt from "big-integer";


export class SC {
    static coefficient = 0.000000000000000001;
    static dailyDistribution = 1e27;
    static tokenContract;
    static tokenContract2;
    static stakingContract;
    static stakingContractV2;
    static stakingContractV3;
    static web3ojb;
    static tokenInst;
    static tokenInst2;
    static tokenInst3;
    static config = {
        mainChainId: 56,
        tokenContractAddress: '0xDc3541806D651eC79bA8639a1b495ACf503eB2Dd',
        tokenContractAddress2: '0x59a3d931bdc9410ede80793f9bb2a782765d2dfb',
        stakingContractAddress: '0xB18f8D065FF530A8c74b29ad231e9ba9b6921d52',
        stakingContractV2Address: '0xa67052fAc1511348FbA0DA4bae7995e230FD6F14',
        stakingContractV3Address: '0x80f43f10e76544Cb91Fe4149043DC443b12ef051',
        mainWallet: '0x8B4754ae99F1e595481029c6835C6931442f5f02',
        timestamp: 1648163253
    };

    static inStake = 0;
    static inStakeV2 = 0;
    static inStakeV3 = 0;
    
static async init(_provider) {
    SC.web3ojb = new Web3(_provider);
    SC.tokenInst = new SC.web3ojb.eth.Contract(stakingABI, SC.config.stakingContractAddress)
    SC.tokenInst2 = new SC.web3ojb.eth.Contract(stakingV2ABI, SC.config.stakingContractV2Address)
    SC.tokenInst3 = new SC.web3ojb.eth.Contract(stakingV3ABI, SC.config.stakingContractV3Address)
    const provider = new ethers.providers.Web3Provider(_provider), signer = provider.getSigner();

    if (!SC.tokenContract) {
        SC.tokenContract = new ethers.Contract(SC.config.tokenContractAddress, tokenABI, signer);
        SC.tokenContract2 = new ethers.Contract(SC.config.tokenContractAddress2, tokenABI, signer);
        SC.stakingContract = new ethers.Contract(SC.config.stakingContractAddress, stakingABI, signer);
        SC.stakingContractV2 = new ethers.Contract(SC.config.stakingContractV2Address, stakingV2ABI, signer);
        SC.stakingContractV3 = new ethers.Contract(SC.config.stakingContractV3Address, stakingV3ABI, signer);
    }
}

static async getInHoldTime() {
    const time = await SC.tokenInst.methods.holdingTime().call();
    return parseInt(time);
}
static async getInHoldTimeV2() {
    const time = await SC.tokenInst2.methods.holdingTime().call();
    return parseInt(time);
}
static async getInHoldTimeV3() {
    const time = await SC.tokenInst3.methods.holdingTime().call();
    return parseInt(time);
}

static async getInStackTime(account) {
    const time = await SC.tokenInst.methods.userLastStackedTime(account).call();
    return parseInt(time);
}
static async getInStackTimeV2(account) {
    const time = await SC.tokenInst2.methods.userLastStackedTime(account).call();
    return parseInt(time);
}
static async getInStackTimeV3(account) {
    const time = await SC.tokenInst3.methods.userLastStackedTime(account).call();
    return parseInt(time);
}

static async allowance(account) {
    const contract = SC.tokenContract;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContract.address);
        console.log('APPROVED_VALUE', approvedRaw);  
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}
static async allowanceV2(account) {
    const contract = SC.tokenContract2;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContractV2.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}
static async allowanceV3(account) {
    const contract = SC.tokenContract2;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContractV3.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}
static async approve() {
     const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
     const contract = SC.tokenContract;
      try {
          let approval = await contract.approve(SC.config.stakingContractAddress, bigNumberValue);

          return !!approval;
      } catch (e) { throw e }
}
static async approveV2() {
    const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
    const contract = SC.tokenContract2;
    
    try {
        let approval = await contract.approve(SC.config.stakingContractV2Address, bigNumberValue);
        return !!approval;
    } catch (e) { throw e }
}
static async approveV3() {
    const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
    const contract = SC.tokenContract2;
    
    try {
        let approval = await contract.approve(SC.config.stakingContractV3Address, bigNumberValue);
        return !!approval;
    } catch (e) { throw e }
}

static async getEarned(account) {
    const earned = bigInt(await SC.tokenInst.methods.earned(account).call());
    return String(earned.value / 10n ** 18n);
}
static async getEarnedV2(account) {
    const earned = bigInt(await SC.tokenInst2.methods.earned(account).call());
    return String(earned.value / 10n ** 18n);
}
static async getEarnedV3(account) {
    const earned = bigInt(await SC.tokenInst3.methods.earned(account).call());
    const str = String(parseFloat(earned.value) / 10 ** 18).substring(0,6);
    return Math.round((parseFloat(str) + Number.EPSILON) * 100) / 100;
}
static async getInStake(account) {
    const balance = bigInt(await SC.tokenInst.methods.balanceOf(account).call());
    SC.inStake = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}
static async getInStakeV2(account) {
    const contract = SC.tokenContract2;
    const balance = bigInt(Number(await contract.balanceOf(account)));
    SC.inStakeV2 = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}
static async getInStakeV3(account) {
    const contract = SC.tokenContract2;
    const balance = bigInt(Number(await contract.balanceOf(account)));
    SC.inStakeV3 = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}

/*static async getEarnedV2(account) {
    try {
        let totalRewards = await V2_getTotalRewardsValue(account, 2678400);
        return totalRewards * SC.coefficient;
    } catch(e) { throw e }
}*/

/*static async getInStakeV2(account) {
    try {
        let allStakesData = await V2_getAllStakesData(account);
        let balance = allStakesData.reduce((acc, stakedToken) => {
            if (!(stakedToken._endTime * 1)) acc += stakedToken._amount * SC.coefficient;
            return acc;
        }, 0);
        SC.inStakeV2 = parseInt(balance);
        return parseInt(balance);
    } catch(e) { throw e }
}*/

static async stake(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async stakeMETO(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst2.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async stakeBNB(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst3.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}

static async harvest(account) {
    SC.tokenInst.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async harvestV2(account) {
    SC.tokenInst2.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async harvestV3(account) {
    SC.tokenInst3.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
           
static async withdraw(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async withdrawV2(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst2.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async withdrawV3(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst3.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}

/*static async stakeV2(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst2.methods.stake(account,amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}

static async harvestV2(account) {
    SC.tokenInst2.methods.getReward(account)
    .send({from: account})
        .then(function(result){
             console.log(result)
    });
}

static async withdrawV2(account) {
    SC.tokenInst2.methods.unStake(account)
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}*/

static async APR() {
    let count1 = await SC.tokenInst.methods.rewardRate().call();
    let count2 = await SC.tokenInst.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18)  * 100 ) / 10 **18;
    return Math.trunc(count);
}
static async APRV2() {
    let count1 = await SC.tokenInst2.methods.rewardRate().call();
    let count2 = await SC.tokenInst2.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18  * 0.369 / 0.00008) * 100) / 10 **18;
    return Math.trunc(count);
}
static async APRV3() {
    let count1 = await SC.tokenInst3.methods.rewardRate().call();
    let count2 = await SC.tokenInst3.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18  * 0.31) * 100) / 10 **18;
    return Math.trunc(count);
}

/*static async APRV2() {
    const contract = SC.stakingContractV2;
    try {
        let byDay = await contract.rewardTokensByDay();
        let totalStacked = await contract.totalStakedTokens();
        let APR = Math.floor(((byDay * SC.coefficient * 365) / + (totalStacked * SC.coefficient)) * 100) || 0;
        return APR;
    } catch(e) { throw e }
}*/


/*static async balanceNft(account) {
    let amount = await SC.tokenInstNft .methods.balanceOf(account).call();
    amount = amount / 10 ** 18; 
    return amount;
}*/
}