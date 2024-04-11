package hr.student.EmiBank.Mapper;

import hr.student.EmiBank.dtos.request.NewClientRequestDto;
import hr.student.EmiBank.dtos.request.UserChangeEmailRequestDto;
import hr.student.EmiBank.dtos.response.ClientData;
import hr.student.EmiBank.model.Client;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    ClientData map(Client client);
    Client map(NewClientRequestDto newClientRequestDto);

    void update(@MappingTarget Client client, UserChangeEmailRequestDto userChangeEmailRequestDto);
}
