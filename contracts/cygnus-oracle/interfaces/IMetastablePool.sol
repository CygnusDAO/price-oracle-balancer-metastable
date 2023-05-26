// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/**
 *  @notice Balancer metastable pool
 */
interface IMetastablePool { 
  // Invariant
  function getLastInvariant() external view returns (uint256 lastInvariant, uint256 lastInvariantAmp);

  // Supply
  function totalSupply() external view returns (uint256);

  function getPoolId() external view returns (bytes32);
}



