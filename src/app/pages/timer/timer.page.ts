import {Component, OnInit} from '@angular/core';
import {Timer, TimerService} from "../../services/timer.service";

@Component({
	selector   : 'app-timer',
	templateUrl: './timer.page.html',
	styleUrls  : ['./timer.page.scss'],
})
export class TimerPage implements OnInit
{
	private _counter!: any;
	private _id!: number | null;
	private _recipe!: string;
	private _timer!: number;
	private _remainingTime: number          = 0;
	private _active: boolean                = false;
	private _media: HTMLAudioElement | null = null;
	private _modification: boolean          = false;
	private _data: Timer                    = {id: new Date().getTime(), recipe: "", timer: 0, active: false};

	constructor(private _timerService: TimerService)
	{
	}

	ngOnInit(): void
	{
	}
	public toggleTimer(timer: Timer): void
	{
		this._id            = timer.id;
		this._recipe        = timer.recipe;
		this._timer         = timer.timer;
		this._active        = !this._active;
		this._remainingTime = this._timer;
		if (this._active)
		{
			this.startTimer();
		}
	}

	public addTimer(): void
	{
		this._data.id     = new Date().getTime();
		this._data.recipe = this._recipe;
		this._data.timer  = this._timer;
		this._data.active = this._active;
		this._timerService.addTimer(this._data);
	}

	public saveTimer(): void
	{
		this._modification ? this.updateTimer() : this.addTimer();
	}

	public preUpdateTimer(timer: Timer): void
	{
		this._id           = timer.id;
		this._recipe       = timer.recipe;
		this._timer        = timer.timer;
		this._active       = timer.active || false;
		this._modification = true;
	}

	public updateTimer(): void
	{
		this._data.id     = this._id;
		this._data.recipe = this._recipe;
		this._data.timer  = this._timer;
		this._data.active = this._active;
		this._timerService.updateTimer(this._data);
		this._modification = false;
	}

	public deleteTimer(timer: Timer): void
	{
		this._timerService.deleteTimer(timer);
	}

	public resetTimer(): void
	{
		this._data.id      = null;
		this._data.id      = 0;
		this._data.recipe  = "";
		this._data.timer   = 0;
		this._data.active  = false;
		this._modification = false;
	}

	public cancelTimer(): void
	{
		this._active = false;
		clearInterval(this._counter);
	}

	private async ring(): Promise<void>
	{
		this._media = new Audio('../../../assets/sounds/alarm.wav');
		this._media?.load();
		await this._media?.play().then((r: void) => r);
	}

	public startTimer(): void
	{
		this._counter = setTimeout((): void =>
		{
			if (this._remainingTime > 0)
			{
				this.startTimer();
				this._remainingTime--;
			}
			else
			{
				this.ring().then(r => r);
				this.cancelTimer();
			}
		}, 60000);
	}

	// GETTERS / SETTERS
	get timerService(): TimerService
	{
		return this._timerService;
	}

	get timer()
	{
		return this._timer;
	}

	set timer(value: number)
	{
		this._timer = value;
	}

	get recipe()
	{
		return this._recipe;
	}

	set recipe(value: string)
	{
		this._recipe = value;
	}

	get active(): boolean
	{
		return this._active;
	}

	get media(): HTMLAudioElement | null
	{
		return this._media;
	}

	set data(data: Timer)
	{
		this._data.recipe = data.recipe;
		this._data.timer  = data.timer;
		this._data.active = data.active;
	}

	get modification(): boolean
	{
		return this._modification;
	}

	get remainingTime(): number
	{
		return this._remainingTime;
	}
}
