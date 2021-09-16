import { Arg, Mutation, Resolver } from "type-graphql";
import AddUserAccountInput from "../../inputs/user-accounts";
import UserAccount from "../../models/UserAccount";
import UserAccountService from "../../services/user-accounts";

@Resolver(() => UserAccountResolver)
class UserAccountResolver {
    @Mutation(() => UserAccount)
    async addUserAccount(@Arg('userAccountInput') newUserAccountInput: AddUserAccountInput) {
        try {
            return await UserAccountService.addNewUserAccount(newUserAccountInput.userId, newUserAccountInput.accountId);
        } catch (e) {
        }
    }
}

export default UserAccountResolver;
