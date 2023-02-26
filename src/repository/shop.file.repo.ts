import fs from "fs/promises";
const file = "data/data.json";

export class ShopFileRepo {
  read() {
    return fs.readFile(file, { encoding: "utf-8" }).then((data) => {
      console.log("Data read successfully from file:", data);
      return JSON.parse(data) as any[];
    });
  }

  async write(data: any[]) {
    const fileData = await fs.readFile(file, "utf-8");
    const parsedData = JSON.parse(fileData);
    const newData = [...parsedData, ...data];
    const finalFile = JSON.stringify(newData);
    await fs.writeFile(file, finalFile, "utf-8");
    console.log("Data written successfully to file:", finalFile);
  }

  async edit(id: string, newData: any) {
    const data = await fs.readFile(file, "utf-8");
    const parseJSON = JSON.parse(data);
    const updatedData = parseJSON.map((item: { id: string }) => {
      if (item.id === id) {
        return { ...item, ...newData };
      }
      return item;
    });
    const finalFile = JSON.stringify(updatedData);
    await fs.writeFile(file, finalFile, "utf-8");
    console.log("Data edited successfully in file:", finalFile);
  }

  async delete(id: string) {
    const data = await fs.readFile(file, "utf-8");
    const parseJSON = JSON.parse(data);
    const finalFile = JSON.stringify(
      parseJSON.filter((item: { id: string }) => item.id !== id)
    );
    await fs.writeFile(file, finalFile, "utf-8");
  }
}
