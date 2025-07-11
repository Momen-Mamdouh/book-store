
import { IBookDetails } from "@/app/_Interfaces/IBookDetails";
import { IBook } from "@/app/_Interfaces/IBooks";

export function getMaturityRating(rating?: string): string {
  return rating === "NOT_MATURE" ? "+3" : "+18";
}

export function getPdfMetadata(book: IBookDetails) {
  return {
    isAvaliable: book?.accessInfo?.pdf?.isAvailable ?? false,
    isEbook: book?.saleInfo?.isEbook ?? false,
    readinglink: book?.accessInfo?.webReaderLink ?? "",
  };
}

export function getDownloadLink(book: IBookDetails): string {
  const pdfLink = book?.accessInfo?.pdf?.acsTokenLink;
  const epubLink = book?.accessInfo?.epub?.acsTokenLink;
  const isDownloadable = book?.accessInfo?.pdf?.isAvailable;

  return isDownloadable && (pdfLink || epubLink)
    ? pdfLink || epubLink!
    : "Not Downloadable";
}

export function getSaleInfo(book: IBookDetails | IBook) {
  return {
    salable: book?.saleInfo?.saleability === "FOR_SALE",
    googleBuyLink: book?.saleInfo?.buyLink ?? "",
  };
}


