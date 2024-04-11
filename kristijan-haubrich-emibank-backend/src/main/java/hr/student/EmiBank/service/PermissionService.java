package hr.student.EmiBank.service;

import hr.student.EmiBank.dtos.request.AddNewPermissionsRequest;
import hr.student.EmiBank.dtos.response.PermissionDetailsDto;
import hr.student.EmiBank.dtos.response.PermissionsResponseDto;
import hr.student.EmiBank.dtos.response.RolesResponseDto;
import hr.student.EmiBank.jpa_repository.PermissionRepo;
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
public class PermissionService {
    private final PermissionRepo permissionRepo;
    @Transactional
    public PermissionsResponseDto getAllPermissions() {
        List<String> permissions = new ArrayList<>();
        List<Permission> basePermissions = permissionRepo.findAll();

        basePermissions.forEach(
                permission -> permissions.add(permission.getName())
        );

        return new PermissionsResponseDto(permissions);
    }
    @Transactional
    public void addNewPermissions(AddNewPermissionsRequest newPermissionsRequest) {
        if (newPermissionsRequest != null){
            newPermissionsRequest.getPermissions().forEach(
                    newPermission -> {
                        Permission permission = Permission.builder()
                                .name(newPermission)
                                .build();

                        permissionRepo.save(permission);
                    }
            );
        }
    }
    @Transactional
    public void deletePermission(String permissionName) {
        Optional<Permission> permission = permissionRepo.findByName(permissionName);

        if (permission.isPresent()){
            permissionRepo.delete(permission.get());
        }
    }
    @Transactional
    public boolean permissionExists(String permissionName) {
        Optional<Permission> permission = permissionRepo.findByName(permissionName);
        if (permission.isPresent()) return true;
        return false;
    }
    @Transactional
    public RolesResponseDto getRolesForPermission(String permissionName) {
        Optional<Permission> permission = permissionRepo.findByName(permissionName);
        List<String> roles = new ArrayList<>();

        if (permission.isPresent()){
            List<Role> databaseRoles = permission.get().getRoles();
            if(permission != null){
                databaseRoles.forEach(
                        role -> roles.add(role.getName())
                );
                return new RolesResponseDto(roles);
            }
        }
        return null;
    }
    @Transactional
    public PermissionDetailsDto getPermissionDetails(String permissionName) {
        Optional<Permission> permission = permissionRepo.findByName(permissionName);
        if (permission.isPresent()){
            String name = permission.get().getName();
            List<String> roles = new ArrayList<>();

            if(permission.get().getRoles() != null) {
                permission.get().getRoles().forEach(
                        role -> roles.add(role.getName())
                );
            }

            return new PermissionDetailsDto(name,roles);
        }
        return null;
    }
}
