import { SetMetadata } from "@nestjs/common";

export const DontIncludeJwt = () => SetMetadata("dontincludejwt",true)