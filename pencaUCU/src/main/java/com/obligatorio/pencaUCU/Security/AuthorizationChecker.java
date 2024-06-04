package com.obligatorio.pencaUCU.Security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationChecker {

    public boolean checkUserAccess(int resourceUserId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        int authenticatedUserId = userDetails.getUserId();
        return authenticatedUserId == resourceUserId;
    }
}
