/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
import { addons } from 'react/addons';


/**
 * Makes the given component "pure" using the PureRenderMixin.
 *
 * @param object component Component.
 */
export default function purify(component) {
    component.prototype.shouldComponentUpdate
        = addons.PureRenderMixin.shouldComponentUpdate;
}
