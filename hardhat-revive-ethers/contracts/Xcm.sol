// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Defines all functions that can be used to interact with XCM
/// @dev Parameters MUST use SCALE codec serialisation
interface IXcm {
    /// Weight v2
    struct Weight {
        /// The computational time used to execute some logic based on reference hardware
        uint64 refTime;
        /// The size of the proof needed to execute some logic
        uint64 proofSize;
    }

    /// @notice Execute a Versioned XCM message locally with the caller's origin
    /// @param message The Versioned XCM message to send
    /// @param weight The maximum amount of weight to be used to execute the message
    function xcmExecute(
        bytes calldata message,
        Weight calldata weight
    ) external;

    /// @notice Send an Versioned XCM message to a destination chain
    /// @param destination The destination location, encoded according to the XCM format
    /// @param message The Versioned XCM message to send
    function xcmSend(
        bytes calldata destination,
        bytes calldata message
    ) external;

    /// @notice Given a message estimate the weight cost
    /// @param message The XCM message to send
    function weighMessage(
        bytes calldata message
    ) external view returns (Weight memory weight);
}

/**
 * @title XcmCaller
 * @dev A contract to interact with the IXcm precompile at a fixed address.
 */
contract XcmCaller {
    // The address of the IXcm precompiled contract.
    // This address is derived from the context provided: 0x00000000000000000000000000000000000A0000
    address private immutable XCM_PRECOMPILE_ADDRESS =
        0x00000000000000000000000000000000000a0000;

    /**
     * @notice Forwards the xcmExecute call to the precompiled IXcm contract.
     * @param message The Versioned XCM message to send.
     * @param weight The maximum amount of weight to be used to execute the message.
     */
    function callXcmExecute(
        bytes calldata message,
        IXcm.Weight calldata weight
    ) external {
        IXcm(XCM_PRECOMPILE_ADDRESS).xcmExecute(message, weight);
    }

    /**
     * @notice Forwards the xcmSend call to the precompiled IXcm contract.
     * @param destination The destination location, encoded according to the XCM format.
     * @param message The Versioned XCM message to send.
     */
    function callXcmSend(
        bytes calldata destination,
        bytes calldata message
    ) external {
        IXcm(XCM_PRECOMPILE_ADDRESS).xcmSend(destination, message);
    }

    /**
     * @notice Forwards the weighMessage call to the precompiled IXcm contract.
     * @param message The XCM message to send.
     * @return weight The estimated weight cost.
     0x050c0004000000281300000028000d010204000101000101010101010101010101010101010101010101010101010101010101010101
     */
    function callWeighMessage(
        bytes calldata message
    ) external view returns (IXcm.Weight memory) {
        return IXcm(XCM_PRECOMPILE_ADDRESS).weighMessage(message);
    }
}
