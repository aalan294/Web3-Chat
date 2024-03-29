const ChatApp = artifacts.require('ChatApp');

module.exports = async(deployer)=>{
    deployer.deploy(ChatApp)
}