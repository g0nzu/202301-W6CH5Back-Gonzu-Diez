import fs from "fs/promises";

const file = "../../data/data.json";

export class ShopFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: "utf-8" })
      .then((data) => JSON.parse(data) as any[]);
  }
  write(data: any[]) {
    return fs.writeFile(file, JSON.stringify(data), { encoding: "utf-8" });
  }
  edit() {}
  delete() {}
}