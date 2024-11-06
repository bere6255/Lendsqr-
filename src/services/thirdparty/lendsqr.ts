import { get, post } from "../../configs/lendsqr";
const karma = async (identity: string) => await get({ url: `/verification/karma/${identity}` });
const bankVerification = async (payload: any) => await post({ url: `/direct-debit/banks/account-lookup`, payload });
const bankTransfer = async (payload: any) => await post({ url: `/bank/transfer`, payload });

export {
    karma,
    bankVerification,
    bankTransfer
}