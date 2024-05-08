export class MaskedUtils {
  private unmaskedValue: string;
  private maskPhone = '(##) ####-####';
  private maskMobile = '(##) 9####-####';
  private finalMaskedValue = '';

  constructor(maskedValue: string) {
    this.unmaskedValue = maskedValue.replace(/[^0-9]/g, '');
  }

  hasChanged(): boolean {
    let maskedValue = '';
    let valueIndex = 0;

    if (this.unmaskedValue.length === 0) {
      this.finalMaskedValue = "";
      return true;
    }

    if (this.unmaskedValue.length > 0 && this.unmaskedValue.length <= 11) {
      if (this.unmaskedValue.length <= 10) {
        for (let i = 0; i < this.maskPhone.length; i++) {
          const ch = this.maskPhone.charAt(i);
          if (ch === '#' || ch === this.unmaskedValue[valueIndex]) {
            maskedValue += this.unmaskedValue[valueIndex];
            valueIndex += 1;
          } else {
            maskedValue += this.maskPhone[i];
          }
          if (valueIndex > this.unmaskedValue.length - 1) {
            break;
          }
        }
      } else {
        for (let i = 0; i < this.maskMobile.length; i++) {
          const ch = this.maskMobile.charAt(i);
          if (ch === '#' || ch === this.unmaskedValue[valueIndex]) {
            maskedValue += this.unmaskedValue[valueIndex];
            valueIndex += 1;
          } else {
            maskedValue += this.maskMobile[i];
          }
          if (valueIndex > this.unmaskedValue.length - 1) {
            break;
          }
        }
      }

      const finalCharCount = maskedValue.replace(/[^0-9]/g, '').length;
      if (finalCharCount <= 11 && valueIndex === this.unmaskedValue.length) {
        this.finalMaskedValue = maskedValue;
        return true;
      }
    }
    return false;
  }

  getMaskedValue(): string {
    return this.finalMaskedValue;
  }

  static isValidPhone(phone: string) {
    return phone.match(/\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4}/g);
  }

  static isValidMobile(phone: string) {
    return phone.match(/\([0-9]{2}\)[\s][9][0-9]{4}-[0-9]{4}/g);
  }
}