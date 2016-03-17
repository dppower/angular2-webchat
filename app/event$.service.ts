import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Rx";
import * as _ from "lodash";

type SubjectId = { id: string; subject: Subject<string>; };

export class Event$Service {
    private subjects_: SubjectId[] = [];

    create(id: string) {
        let subject = new Subject<string>();
        this.subjects_.push({ id, subject });
    };

    emit(id: string, data: string) {
        this.getSubject(id).next(data);
    };

    subscribe(id: string, onNext: (value: string) => void) {
        return this.getSubject(id).subscribe(onNext);
    };

    getSubject(id: string) {
        let i = _.findIndex(this.subjects_, (e => e.id == id));
        let subject = this.subjects_[i].subject;
        return subject;
    };
}