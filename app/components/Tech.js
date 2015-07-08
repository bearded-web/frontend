/**
 * Tech
 */

import { PropTypes, Component } from 'react';
import { Tech as TechType } from '../lib/types';
import { create as createStyle } from 'react-style';
import { updateTechStatus } from '../mutators/techsMutators';
import { CORRECT, INCORRECT, UNKNOWN } from '../lib/techStatus';
import { context } from '../lib/nf';

import Fa from './fa';
import TechIcon from './TechIcon';

const S = createStyle({
    container: {
        position: 'relative'
    },
    content: { marginLeft: '4.2rem' },
    categories: {
        fontSize: '1.1rem',
        color: '#888'
    },
    icon: {
        position: 'absolute',
        top: '1.5rem'
    }
});

@context({}, { updateTechStatus })
export default class Tech extends Component {
    static propTypes = {
        updateTechStatus: PropTypes.func.isRequired,
        tech: TechType,
        style: PropTypes.object
    };

    setIncorrect = () => {
        this.props.updateTechStatus(this.props.tech.id, INCORRECT);
    }

    setCorrect = () => {
        this.props.updateTechStatus(this.props.tech.id, CORRECT);
    }

    render() {
        const { style, tech } = this.props;
        const { name, url, version, categories, status } = tech;
        const verStr = version ? `(${version})` : '';
        const isCorrect = status === CORRECT;
        const isUnknown = status === UNKNOWN;
        const isIncorrect = status === INCORRECT;
        const needIncorrect = isCorrect || isUnknown;
        const needCorrect = isUnknown || isIncorrect;

        return <div styles={[S.container, style]}>
            <div style={S.icon}>
                <TechIcon ref="icon" tech={tech}/>
            </div>
            <div style={S.content}>
                <h4>
                    <a ref="link" href={url} target="_blank">
                        {name} {verStr} <Fa icon="external-link"/>
                    </a>
                </h4>
                {categories && <div
                    ref="categories"
                    style={S.categories}>
                    {categories.join(', ')}
                </div>}
                <br/>
                <div>
                    {needCorrect && <button
                        onClick={this.setCorrect}
                        ref="correct"
                        className="btn btn-xs btn-success">{iget('Mark as correct')}</button>}
                    &nbsp;
                    {needIncorrect && <button
                        onClick={this.setIncorrect}
                        ref="incorrect"
                        className="btn btn-warning btn-xs">{iget('Mark as incorrect')}</button>}
                </div>
            </div>
        </div>;
    }
}
