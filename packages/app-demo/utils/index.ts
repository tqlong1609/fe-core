type InputRow = string[];
type Output = { [key: string]: any };

export function transformInput(input: InputRow[]): Output {
  let output: Output = {};
  let currentSection: string | null = null;
  let currentHeaders: string[] | null = null;

  for (let row of input) {
    if (row.length === 0) continue;

    if (row.length === 1 && row[0].endsWith(' Start')) {
      currentSection = row[0].replace(' Start', '');
      currentHeaders = null;
      output[currentSection] = [];
    } else if (row.length === 1 && row[0].endsWith(' End')) {
      currentSection = null;
    } else if (currentSection && !currentHeaders) {
      currentHeaders = row;
    } else if (currentSection && currentHeaders) {
      let item: { [key: string]: string } = {};
      for (let i = 0; i < currentHeaders.length; i++) {
        item[currentHeaders[i]] = row[i];
      }
      output[currentSection].push(item);
    } else if (!currentSection) {
      output[row[0]] = row[1];
    }
  }

  return output;
}

export function transformArray(input: any[][]): any[] {
  const [header, ...data] = input;
  return data.map((row) => {
    let obj: { [key: string]: any } = {};
    row.forEach((item, index) => {
      obj[header[index]] = item;
    });
    return obj;
  });
}
