const levels = ["debug", "info", "warn", "error"] as const;
const package_backend = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "service",
  "route",
] as const;
const package_frontend = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
] as const;
const package_fb = ["auth", "config", "middleware", "utils"] as const;

type stack = "backend" | "frontend";

export const Log = (
  stack: stack,
  level: (typeof levels)[number],
  packages: string,
  message: string,
) => {
  if (stack === "backend" && !package_backend.includes(packages as any)) {
    throw new Error(`Invalid package for backend: ${packages}`);
  } else if (
    stack === "frontend" &&
    !package_frontend.includes(packages as any)
  ) {
    throw new Error(`Invalid package for frontend: ${packages}`);
  }

  console.log(stack, level, packages, message);
  const req = async () => {
    const res = await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhczIzNTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTUyMywiaWF0IjoxNzc3NzAwNjIzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWIyYjIzZTYtM2FmOS00MWE1LWE2MzctNWFhMTA2YWNjMmUzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJqdW4ga2F5bWFsYSIsInN1YiI6IjhjNmVkYTBkLTNhMzgtNDY4Yi05ODllLTVkNGNhZDFhNzM3YiJ9LCJlbWFpbCI6ImFzMjM1M0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFyanVuIGtheW1hbGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwNDAwNDYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4YzZlZGEwZC0zYTM4LTQ2OGItOTg5ZS01ZDRjYWQxYTczN2IiLCJjbGllbnRTZWNyZXQiOiJUemZSaGZyY3pSdUhCREJEIn0.GjnGzkagRw3V1YU1CZy5XMvrdQ1qpzXbudMv3sNR4Mo",
      },
      body: JSON.stringify({
        stack,
        level,
        package: packages,
        message,
      }),
    });

    console.log(await res.json());
  };
  req();
};

Log("backend", "error", "handler", "This is test");
