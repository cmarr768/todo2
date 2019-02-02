using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace idsrv {
    public class Startup {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices (IServiceCollection services) {
            // configure identity server with in-memory stores, keys, clients and resources
            services.AddIdentityServer ()
                .AddDeveloperSigningCredential ()
                .AddInMemoryIdentityResources (Config.GetIdentityResources ())
                .AddInMemoryApiResources (Config.GetApis ())
                .AddInMemoryClients (Config.GetClients ())
                .AddTestUsers (Config.GetUsers ());

            services.AddCors (options => {
                // this defines a CORS policy called "default"
                options.AddPolicy ("default", policy => {
                    policy.WithOrigins ("http://localhost:3000")
                        .AllowAnyHeader ()
                        .AllowAnyMethod ();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseCors ("default");
            app.UseIdentityServer ();
        }
    }
}