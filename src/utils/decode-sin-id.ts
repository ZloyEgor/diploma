export const decodeSinId = (id: number) => {
  const intValue: bigint = BigInt(id);

  const permissionMask: bigint = BigInt('0xC000000000000000');
  const senseNumberMask: bigint = BigInt('0x3FFFFF0000000000');
  const instanceNumberMask: bigint = BigInt('0xFFFFFFFFFF');

  const permission: bigint = (intValue & permissionMask) >> 62n;
  const senseNumber: bigint = (intValue & senseNumberMask) >> 40n;
  const instanceNumber: bigint = intValue & instanceNumberMask;

  return {
    permission: Number(permission),
    senseId: Number(senseNumber),
    instanceId: Number(instanceNumber),
  };
};
