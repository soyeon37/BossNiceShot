package com.ssafy.domain.Companion.dto.request;

import com.ssafy.common.TeeBox;
import jakarta.validation.constraints.NotNull;

public record CompanyUpdate(@NotNull String title,
                            String contents,
                            @NotNull Integer field,
                            @NotNull TeeBox teeBox,
                            @NotNull Integer aimPeople




                            ) {
}
