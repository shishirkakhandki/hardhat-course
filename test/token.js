const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should assign the total supply to the owner", async function () {
    const [owner] = await ethers.getSigners();
    console.log("Signers object: ", owner);
    const token = await ethers.getContractFactory("Token");
    const hardhatToken = await token.deploy();
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    console.log("Owner address: ", owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });


  it("To test transfer", async function(){
     const [owner, addr1, addr2] = await ethers.getSigners();
     console.log("Signers object: ", await ethers.getSigners());
     const token = await ethers.getContractFactory("Token");
     const deployedInstance = await token.deploy();
     deployedInstance.transfer(addr1.address, 10);
     expect(await deployedInstance.balanceOf(addr1)).to.equal(10);
     
     await deployedInstance.connect(addr1).transfer(addr2.address, 5);
     expect(await deployedInstance.balanceOf(addr2)).to.equal(5);
     
  });

});
