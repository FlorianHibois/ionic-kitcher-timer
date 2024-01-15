import {Injectable} from '@angular/core';

export interface Timer
{
	id: number | null;
	recipe: string;
	timer: number;
	active?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class TimerService
{

	private _timerList: Timer[] = [
		{
			id    : 1,
			recipe: "Boiled eggs",
			timer : 5,
			active: false
		},
		{
			id    : 2,
			recipe: "Fresh pasta",
			timer : 30,
			active: false
		},
		{
			id    : 3,
			recipe: "Roast chicken",
			timer : 35,
			active: false
		},
	]

	constructor()
	{
	}

	public addTimer(data: Timer): void
	{
		this._timerList.push(data);
	}

	public updateTimer(data: Timer): void
	{
		let timer: Timer | undefined = this._timerList.find((e: Timer): boolean => e.id === data.id);
		if (timer)
		{
			timer.recipe = data.recipe;
			timer.timer  = data.timer;
			timer.active = data.active;
		}
	}

	public deleteTimer(data: Timer): void
	{
		this._timerList.splice(this._timerList.indexOf(data), 1);
	}

	get timerList(): Timer[]
	{
		return this._timerList;
	}

}
