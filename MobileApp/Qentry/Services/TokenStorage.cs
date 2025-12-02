using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Services
{
    public static class TokenStorage
    {
        private const string AccessTokenKey = "access_token";
        private const string RefreshTokenKey = "refresh_token";
        public static async Task SaveTokensAsync(string access, string refresh)
        {
            await SecureStorage.SetAsync(AccessTokenKey, access);
            await SecureStorage.SetAsync(RefreshTokenKey, refresh);
        }

        public static async Task<string?> GetAccessTokenAsync()
            => await SecureStorage.GetAsync(AccessTokenKey);

        public static async Task<string?> GetRefreshTokenAsync()
            => await SecureStorage.GetAsync(RefreshTokenKey);

        public static void ClearTokens()
        {
            SecureStorage.Remove(AccessTokenKey);
            SecureStorage.Remove(RefreshTokenKey);
        }

        public static void ClearTokensIfNotRemembered()
        {
            bool remember = Preferences.Get("RememberMe", false);

            if (!remember)
                ClearTokens();
        }
    }
}
