import { ApiError } from '../../helpers/apiError';
import { DirectiveResolverMap } from '../../typings/resolverMap';

export const resolvers: Pick<DirectiveResolverMap, 'requireAuth'> = {
  async requireAuth(next, _source, _args, context) {
    if (context.viewer) {
      return next();
    } else {
      throw new ApiError('MustBeAuthorizedError');
    }
  },
};