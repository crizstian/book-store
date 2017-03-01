import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBook'
})
export class FilterBookPipe implements PipeTransform {
    transform(books: Array<any>, parameters): Array<any> {
      if (Object.keys(parameters).length === 0) {
          return books
      }

      return books.filter(book => {
        for (let p in parameters) {
            if (book[p] === parameters[p]) {
                return true
            }
        }
      })
    }
}
