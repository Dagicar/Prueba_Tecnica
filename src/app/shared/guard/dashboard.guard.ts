import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const DashboardGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn()) {
        router.navigate(['/dashboard'])
        return true
    }
    return true
};
