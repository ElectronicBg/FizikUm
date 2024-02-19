using FizikUm.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FizikUm.Data
{
    public class DbSeeder
    {
        public static async Task SeedRolesAndAdminAsync(IServiceProvider serviceProvider)
        {
            try
            {
                using (var scope = serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                    // Ensure the database is created and migrated
                    dbContext.Database.Migrate();

                    // Seed Roles
                    var adminRoleName = Roles.Admin.ToString();
                    var teacherRoleName = Roles.Teacher.ToString();
                    var studentRoleName = Roles.Student.ToString();
                    if (!await roleManager.RoleExistsAsync(adminRoleName))
                    {
                        await roleManager.CreateAsync(new IdentityRole(adminRoleName));
                        await roleManager.CreateAsync(new IdentityRole(teacherRoleName));
                        await roleManager.CreateAsync(new IdentityRole(studentRoleName));
                    }

                    // Seed Admin User
                    var adminEmail = "admin@gmail.com";
                    if (await userManager.FindByEmailAsync(adminEmail) == null)
                    {
                        var adminUser = new ApplicationUser
                        {
                            UserName = adminEmail,
                            Name = "Admin",
                            Email = adminEmail,
                            // Add other properties as needed
                        };

                        var result = await userManager.CreateAsync(adminUser, "Admin@123");
                        if (result.Succeeded)
                        {
                            await userManager.AddToRoleAsync(adminUser, adminRoleName);
                        }
                        else
                        {
                            throw new Exception($"Failed to create admin user: {string.Join(", ", result.Errors)}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred during seeding roles and admin: {ex.Message}");
                throw; // Rethrow the exception to halt the application if seeding fails
            }
        }
    }
}



