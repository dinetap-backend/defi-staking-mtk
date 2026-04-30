// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {MyToken} from "src/MyToken.sol";
import {MyStaking} from "src/MyStaking.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        MyToken token = new MyToken();
        console.log("MyToken deployed at:", address(token));

        // Pre-calculated: 10 tokens per day (no division error)
        uint256 rewardRate = 115740740740740;

        MyStaking staking = new MyStaking(address(token), address(token), rewardRate);
        console.log("MyStaking deployed at:", address(staking));

        token.transfer(address(staking), 100_000 * 1e18);
        console.log("100,000 MTK funded to reward pool");

        vm.stopBroadcast();
    }
}
