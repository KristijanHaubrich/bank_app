package hr.student.EmiBank.service;

import hr.student.EmiBank.dtos.request.NewRoleRequestDto;
import hr.student.EmiBank.dtos.response.PermissionsResponseDto;
import hr.student.EmiBank.dtos.response.RoleDetailsResponseDto;
import hr.student.EmiBank.dtos.response.RolesResponseDto;
import hr.student.EmiBank.jpa_repository.PermissionRepo;
import hr.student.EmiBank.jpa_repository.RoleRepo;
import hr.student.EmiBank.model.Permission;
import hr.student.EmiBank.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RolesService {
    private final RoleRepo roleRepo;
    private final PermissionRepo permissionRepo;
    @Transactional
    public RolesResponseDto getAllRoles(){
        List<String> roles = new ArrayList<>();
        List<Role> rolesFromBase = roleRepo.findAll();

        rolesFromBase.forEach(
                role -> roles.add(role.getName())
        );

        return new RolesResponseDto(roles);
    }

    @Transactional
    public void addNewRoleOrEditOldRole(NewRoleRequestDto newRoleRequestDto) {
        Optional<Role> role = roleRepo.findByName(newRoleRequestDto.getRoleName());
        List<Permission> permissions = new ArrayList<>();

        newRoleRequestDto.getPermissions().forEach(
                permission -> {
                    Optional<Permission> databasePermission = permissionRepo.findByName(permission);
                    if(!databasePermission.isPresent()){
                        Permission newPermission = Permission.builder()
                                .name(permission)
                                .build();

                        permissionRepo.save(newPermission);
                        Optional<Permission> newDatabasePermission = permissionRepo.findByName(permission);
                        permissions.add(newDatabasePermission.get());
                    }else{
                        permissions.add(databasePermission.get());
                    }
                }
        );

        if(!role.isPresent()){
            Role newRole = Role.builder()
                    .name(newRoleRequestDto.getRoleName())
                    .permissions(permissions)
                    .build();

            roleRepo.save(newRole);
        }else{
            List<Permission> currentPermissions = role.get().getPermissions();

            currentPermissions.forEach(
                    currentPermission -> {
                        if(permissions.contains(currentPermission.getName())){
                            permissions.remove(currentPermission);
                        }
                    }
            );

            permissions.addAll(currentPermissions);
            permissions.addAll(role.get().getPermissions());
            role.get().setPermissions(permissions);
        }
    }

    @Transactional
    public boolean roleExists(String roleName) {
        Optional<Role> role = roleRepo.findByName(roleName);
        if (role.isPresent()) return true;
        return false;
    }

    @Transactional
    public RoleDetailsResponseDto getRoleDetails(String roleName) {
        Optional<Role> role = roleRepo.findByName(roleName);
        if (role.isPresent()){
            String name = role.get().getName();
            List<String> permissions = new ArrayList<>();
            List<String> users = new ArrayList<>();

            role.get().getPermissions().forEach(
                    permission -> permissions.add(permission.getName())
            );

            if(role.get().getUsers() != null){
                role.get().getUsers().forEach(
                        user -> users.add(user.getName())
                );
            }

            return new RoleDetailsResponseDto(name,permissions,users);
        }
        return null;
    }

    @Transactional
    public void deleteRole(String roleName) {
        Optional<Role> role = roleRepo.findByName(roleName);

        if (role.isPresent()){
            roleRepo.delete(role.get());
        }
    }
    @Transactional
    public PermissionsResponseDto getPermissionsForRole(String roleName) {
        Optional<Role> role = roleRepo.findByName(roleName);
        List<String> permissions = new ArrayList<>();

        if (role.isPresent()){
            List<Permission> databasePermissions = role.get().getPermissions();
            databasePermissions.forEach(
                    permission -> permissions.add(permission.getName())
            );
            return new PermissionsResponseDto(permissions);
        }
        else return null;
    }
}
