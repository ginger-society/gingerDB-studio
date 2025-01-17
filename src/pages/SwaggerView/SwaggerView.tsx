import HeaderContainer from "@/components/atoms/HeaderContainer";
import { MetadataService } from "@/services";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
// Helper function to recursively remove the `security` key
const removeSecurityKey = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeSecurityKey);
  } else if (obj !== null && typeof obj === "object") {
    const newObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key !== "security") {
        newObj[key] = removeSecurityKey(value);
      }
    }
    return newObj;
  }
  return obj;
};
const SwaggerViewPage = () => {
  const { service_identifier, env_id, org_id } = useParams<{
    org_id: string;
    service_identifier: string;
    env_id: string;
  }>();

  const [spec, setSpec] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      if (service_identifier && env_id && org_id) {
        const data = await MetadataService.metadataGetServiceAndEnvByIdUserLand(
          {
            serviceIdentifier: service_identifier,
            env: env_id,
            orgId: org_id,
          }
        );
        setSpec({
          ...removeSecurityKey(JSON.parse(data.spec)),
          servers: [
            {
              url: data.baseUrl,
              description: env_id,
            },
          ],
        });
      }
    };
    fetchData();
  }, [service_identifier, env_id, org_id]);

  const token = useMemo(() => {
    return localStorage.getItem("access_token");
  }, []); // Retrieve the token from localStorage

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <SwaggerUI
        spec={spec}
        requestInterceptor={(req) => {
          if (token) {
            req.headers["Authorization"] = token;
          }
          return req;
        }}
      />
    </>
  );
};

export default SwaggerViewPage;
