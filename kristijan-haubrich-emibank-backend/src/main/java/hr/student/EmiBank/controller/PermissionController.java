package hr.student.EmiBank.controller;

import hr.student.EmiBank.dtos.request.AddNewPermissionsRequest;
import hr.student.EmiBank.dtos.response.PermissionDetailsDto;
import hr.student.EmiBank.dtos.response.PermissionsResponseDto;
import hr.student.EmiBank.dtos.response.RoleDetailsResponseDto;
import hr.student.EmiBank.dtos.response.RolesResponseDto;
import hr.student.EmiBank.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/permissions/")
public class PermissionController {
    private final PermissionService permissionService;

    @GetMapping
    @PostAuthorize("hasRole('ADMIN')")
    public PermissionsResponseDto getAllPermissions(){
        return permissionService.getAllPermissions();
    }
    @GetMapping("getPermissionDetails/{permissionName}")
    @PostAuthorize("hasRole('ADMIN')")
    public PermissionDetailsDto getPermissionDetails(@PathVariable String permissionName){
        return permissionService.getPermissionDetails(permissionName);
    }
    @GetMapping("{permissionName}")
    @PostAuthorize("hasRole('ADMIN')")
    public boolean permissionExists(@PathVariable String permissionName){
        return permissionService.permissionExists(permissionName);
    }
    @GetMapping("getRolesForPermission/{permissionName}")
    @PostAuthorize("hasRole('ADMIN')")
    public RolesResponseDto getRolesForPermission(@PathVariable String permissionName){
        return permissionService.getRolesForPermission(permissionName);
    }
    @PostMapping
    @PostAuthorize("hasRole('ADMIN')")
    public void addNewPermissions(@RequestBody AddNewPermissionsRequest newPermissionsRequest){
        permissionService.addNewPermissions(newPermissionsRequest);
    }

    @DeleteMapping("{permissionName}")
    @PostAuthorize("hasRole('ADMIN')")
    public void deletePermission(@PathVariable String permissionName){
        permissionService.deletePermission(permissionName);
    }
}
