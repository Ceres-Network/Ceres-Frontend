/**
 * Mock CeresClient type definitions
 * This file provides type definitions for the @ceres-network/sdk
 * until the actual SDK is available.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CeresClient {
  // Pool methods
  getPoolStats(): Promise<any>;
  deposit(keypair: any, amount: bigint): Promise<any>;
  withdraw(keypair: any, shares: bigint): Promise<any>;
  
  // Policy methods
  registerPolicy(keypair: any, params: any): Promise<any>;
  getPolicy(policyId: string): Promise<any>;
  listFarmerPolicies(address: string): Promise<any>;
  
  // Oracle methods
  submitOracleReading(keypair: any, params: any): Promise<any>;
  getAggregatedReading(geoCell: string, readingType: string): Promise<any>;
  
  // Trigger methods
  evaluatePolicy(keypair: any, policyId: string): Promise<any>;
  isTriggered(policyId: string): Promise<boolean>;
}

export interface CeresClientConfig {
  networkPassphrase: string;
  rpcUrl: string;
  poolContractId: string;
  policyContractId: string;
  oracleContractId: string;
  triggerContractId: string;
}
