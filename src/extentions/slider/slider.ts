import './slider.scss';

type SliderOptions = {
  [option: string]: string;
};

export default class Slider {
  itemsWrapperParent: HTMLElement;
  itemsWrapper: HTMLElement;
  sliderItem: HTMLElement;
  itemActiveClass: string;
  options: SliderOptions;
  sliderClassName: string;
  sliderInnerClassName: string;
  prevButtonClassName: string;
  nextButtonClassName: string;
  sliderWrapper: HTMLDivElement;
  sliderTrack: HTMLDivElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  visibleElements: number;
  step: number;
  activeElement: number;
  itemWidth: number;

  constructor(
    itemsWrapperParentClass: string,
    itemsWrapperClass: string,
    itemClass: string,
    itemActiveClass: string,
    visibleElements: number
  ) {
    this.itemsWrapperParent = document.querySelector(itemsWrapperParentClass);
    this.itemsWrapper = document.querySelector(itemsWrapperClass);
    this.sliderItem = document.querySelector(itemClass);
    this.itemActiveClass = itemActiveClass;
    this.sliderClassName = 'slider';
    this.sliderInnerClassName = 'slider__track';
    this.prevButtonClassName = 'slider__prev';
    this.nextButtonClassName = 'slider__next';
    this.visibleElements = visibleElements;

    this.sliderWrapper = document.createElement('div');
    this.sliderTrack = document.createElement('div');
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.step = 0;
    this.activeElement = 0;
    this.itemWidth = Math.ceil(this.sliderTrack.offsetWidth / this.visibleElements);
  }

  watchActive(number: number): void {
    if (this.activeElement < this.step) {
      this.step -= number;
    }
    if (this.activeElement > this.step + this.visibleElements - 1) {
      this.step += number;
    }
    this.moveSlide();
  }

  setActive(): void {
    this.itemsWrapper.childNodes.forEach((element) => {
      if ((<HTMLElement>element).classList.contains(this.itemActiveClass)) {
        (<HTMLElement>element).classList.remove(this.itemActiveClass);
      }
    });
    (<HTMLElement>this.itemsWrapper.childNodes[this.activeElement]).classList.add(this.itemActiveClass);
  }

  setSliderItemWidth(): void {
    this.sliderTrack.style.width = `${Math.ceil(window.innerWidth * 0.8)}px`;
    this.itemWidth = Math.ceil(this.sliderTrack.offsetWidth / this.visibleElements);
    this.itemsWrapper.childNodes.forEach((element) => {
      (<HTMLElement>element).style.width = `${this.itemWidth}px`;
    });
    this.setItemsWrapperWidth(this.itemsWrapper.childNodes.length);
  }

  setItemsWrapperWidth(elementsTotalCount: number): void {
    const avoidOverlapingVariable: number = 1.1;
    this.itemsWrapper.style.width = `${this.itemWidth * elementsTotalCount * avoidOverlapingVariable}px`;
  }

  moveSlide(): void {
    this.itemsWrapper.style.transform = `translateX(-${
      (this.sliderTrack.offsetWidth / this.visibleElements) * this.step
    }px)`;
  }

  changeStepByKey(str: string): void {
    switch (str) {
      case '++':
        if (this.activeElement + 1 < this.itemsWrapper.childNodes.length) {
          this.activeElement += 1;
          this.watchActive(1);
          this.setActive();
        }
        break;
      case '--':
        if (this.activeElement - 1 >= 0) {
          this.activeElement -= 1;
          this.watchActive(1);
          this.setActive();
        }
        break;
      default:
        break;
    }
    this.checkBtn();
  }

  changeStepByBtn(str: string): void {
    const totalElems: number = this.itemsWrapper.childNodes.length;

    if (str === '++') {
      if (this.step + this.visibleElements * 2 <= totalElems) {
        this.step += this.visibleElements;
      } else if (
        this.step + (totalElems % this.visibleElements) < totalElems &&
        this.step + this.visibleElements < totalElems
      ) {
        this.step += totalElems % this.visibleElements;
      }
    }
    if (str === '--') {
      if (this.step - this.visibleElements >= 0) {
        this.step -= this.visibleElements;
      } else if (this.step - (totalElems % this.visibleElements) >= 0) {
        this.step -= totalElems % this.visibleElements;
      }
    }
    this.activeElement = this.step;
    this.watchActive(this.activeElement);
    this.setActive();
    this.checkBtn();
  }

  checkBtn(): void {
    const totalElems: number = this.itemsWrapper.childNodes.length;

    if (this.step + this.visibleElements < totalElems) {
      this.nextBtn.disabled = false;
    } else {
      this.nextBtn.disabled = true;
    }

    if (this.step - this.visibleElements >= 0 || this.step - 1 >= 0) {
      this.prevBtn.disabled = false;
    } else {
      this.prevBtn.disabled = true;
    }
  }

  init(): void {
    this.sliderWrapper.className = this.sliderClassName;
    this.sliderTrack.className = this.sliderInnerClassName;
    this.prevBtn.className = this.prevButtonClassName;
    this.nextBtn.className = this.nextButtonClassName;

    this.sliderTrack.append(this.itemsWrapper);
    this.sliderWrapper.append(this.prevBtn);
    this.sliderWrapper.append(this.sliderTrack);
    this.sliderWrapper.append(this.nextBtn);
    this.itemsWrapperParent.append(this.sliderWrapper);

    this.nextBtn.addEventListener('click', () => {
      this.changeStepByBtn('++');
    });
    this.prevBtn.addEventListener('click', () => {
      this.changeStepByBtn('--');
    });

    const sliderElements: HTMLElement = this.itemsWrapper;

    sliderElements.addEventListener('click', (e: Event) => {
      const list = sliderElements.childNodes;
      list.forEach((element) => {
        if ((<HTMLElement>element).classList.contains(this.itemActiveClass)) {
          (<HTMLElement>element).classList.remove(this.itemActiveClass);
        }
      });
      for (let val = 0; val < list.length; val++) {
        if (list[val] === e.target || list[val].childNodes[0] === e.target) {
          this.activeElement = val;
          this.setActive();
        }
      }
    });

    window.addEventListener('resize', () => {
      this.setSliderItemWidth();
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          this.changeStepByKey('++');
          this.moveSlide();
          break;
        case 'ArrowLeft':
          this.changeStepByKey('--');
          this.moveSlide();
          break;
        default:
          break;
      }
    });

    this.setSliderItemWidth();
    this.checkBtn();
  }
}
