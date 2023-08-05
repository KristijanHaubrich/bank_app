package hr.student.EmiBank.controller;

import hr.student.EmiBank.dtos.request.NewRoleRequestDto;
import hr.student.EmiBank.dtos.response.PermissionsResponseDto;
import hr.student.EmiBank.dtos.response.RoleDetailsResponseDto;
import hr.student.EmiBank.dtos.response.RolesResponseDto;
import hr.student.EmiBank.service.RolesService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roles/")
public class RoleController {

    private final RolesService roleService;

    @GetMapping
    @PostAuthorize("hasRole('ADMIN')")
    public RolesResponseDto getAllRoles(){
        return roleService.getAllRoles();
    }
    @GetMapping("{roleName}")
    @PostAuthorize("hasRole('ADMIN')")
    public boolean roleExists(@PathVariable String roleName){
        return roleService.roleExists(roleName);
    }
    @GetMapping("getPermissionsForRole/{roleName}")
    @PostAuthorize("hasRole('ADMIN')")
    public PermissionsResponseDto getPermissionsForRole(@PathVariable String roleName){
        return roleService.getPermissionsForRole(roleName);
    }
    @GetMapping("getRoleDetails/{roleName}")
    @PostAuthorize("hasRole('ADMIN')")
    public RoleDetailsResponseDto getRoleDetails(@PathVariable String roleName){
        return roleService.getRoleDetails(roleName);
    }
    @PostMapping
    @PostAuthorize("hasRole('ADMIN')")
    public void addNewRoleOrEditOldRole(@RequestBody NewRoleRequestDto newRoleRequestDto){
        roleService.addNewRoleOrEditOldRole(newRoleRequestDto);
    }

    @DeleteMapping("{roleName}")
    @PostAuthorize("hasRole('ADMIN')")
    public void deleteRole(@PathVariable String roleName){
      roleService.deleteRole(roleName);
    }
}
