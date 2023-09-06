import html2canvas from 'html2canvas';
import { useRef } from 'react';

/**
 * Copies a blob to user's clipboard.
 *
 * Throws an error if cannot write on the user's clipboard.
 *
 * @param {Blob} blob Blob to be copied.
 */
export async function copyBlobToClipboard(blob: Blob): Promise<void> {
  const items = { [blob.type]: blob } as unknown as Record<
    string,
    ClipboardItemData
  >;

  const clipboardItem = new ClipboardItem(items);
  await navigator.clipboard.write([clipboardItem]);
}

export const useCopyComponentImageToClipboard = (): [
  React.LegacyRef<HTMLDivElement> | undefined,
  {
    handleDownloadImage: (resolve?: () => void) => Promise<void>;
  }
] => {
  const printRef = useRef<any>();
  const handleDownloadImage = async (resolve?: () => void) => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          copyBlobToClipboard(blob);
          resolve && resolve();
        }
      },
      'image/png',
      1
    );
  };

  return [printRef, { handleDownloadImage }];
};
