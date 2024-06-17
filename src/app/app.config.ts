import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Import the interceptors
import { loggerInterceptor } from './interceptors/logger.interceptor';
import { requestInterceptor } from './interceptors/request.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Store
import { groupsReducer } from '@pages/home/ngrx/groups/groups.reducer';
import { membersReducer } from '@pages/home/ngrx/members/members.reducer';
import { userReducer } from './ngrx/user.reducer';

// Effects
import { GroupsEffects } from '@pages/home/ngrx/groups/groups.effects';
import { MembersEffects } from '@pages/home/ngrx/members/members.effects';
import { UsersEffects } from './ngrx/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loggerInterceptor, requestInterceptor])
    ),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideStore({
      groups: groupsReducer,
      members: membersReducer,
      users: userReducer,
    }),
    provideEffects(GroupsEffects, MembersEffects, UsersEffects),
  ],
};
