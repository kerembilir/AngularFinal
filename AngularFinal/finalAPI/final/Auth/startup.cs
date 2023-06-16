using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Cors;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;

[assembly: OwinStartup(typeof(final.Auth.Startup))]

namespace final.Auth
{
    public class Startup
    {
        public TimeSpan AccessTokenExpireTimeSpan { get; private set; }
        public bool AllowInsecureHttp { get; private set; }
        public PathString TokenEndpointPath { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            HttpConfiguration httpConfiguration = new HttpConfiguration();

            ConfigureOAuth(app);

            WebApiConfig.Register(httpConfiguration);
            app.UseWebApi(httpConfiguration);
        }

        private void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions oAuthAuthorizationServerOptions = new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath = new PathString("/api/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(12),
                AllowInsecureHttp = true,
                Provider = new AuthProvider()
            };

            app.UseOAuthAuthorizationServer(oAuthAuthorizationServerOptions);

            app.UseOAuthBearerAuthentication(new Microsoft.Owin.Security.OAuth.OAuthBearerAuthenticationOptions());
        }
    }
}
