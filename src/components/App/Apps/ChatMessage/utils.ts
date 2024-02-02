// 校验钱包地址是否正确
export const isValidateAddress = async (address: string) => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(address.length === 6);
    }, 300);
  });
};
