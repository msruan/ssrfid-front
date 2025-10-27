import { Employee } from "./types";

export const employeesFixture: Employee[] = ["João", "Pedro", "Tiago"].map((name) => ({
  username: name,
  role: "operator",
}));
