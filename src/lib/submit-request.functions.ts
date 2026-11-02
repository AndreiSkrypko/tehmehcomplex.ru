import { createServerFn } from "@tanstack/react-start";

import { deliverRequest } from "./request-delivery.server";

function parseFormData(formData: FormData) {
  const file = formData.get("file");
  return {
    name: formData.get("name")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    file: file instanceof File && file.size > 0 ? file : null,
  };
}

export const submitRequest = createServerFn({ method: "POST" })
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }
    return parseFormData(data);
  })
  .handler(async ({ data }) => deliverRequest(data));
