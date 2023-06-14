function component( args ) {
/*
This is an editor component that is used to edit a component icon

base_component_id("icon_editor_component")
component_type("SYSTEM")
load_once_from_file(true)
*/

    Yazz.component(
    {
        data:       function () {
            return {
                text:                   args.text,
                mousedown:              false,
                icon_image_data:        null,
                draw_color:             "black",
                brush_width:            3,
                baseComponentId:        null,
                colors:                 [ "blue","green","yellow","orange","black","white","purple","red","violet","blue","gray","pink","orange","lightgray","darkgray", "cyan","lightblue" ]  ,
                iconHeightPixels:       200,
                iconWidthPixels:        200
            }
        },
        template:   `<div style='background-color:white; ' >
                          <div style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);background-color: lightgray; padding: 5px;padding-left: 15px;border: 4px solid lightgray;' >
                            <slot style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);display: inline-block;' v-if='text' :text2="text">
                            </slot>
                          </div>
        
                
                          <!-- ---------------------------------------------------------------------------------------------
                          Show the new style view 
                          --------------------------------------------------------------------------------------------- -->
                          <div  style='overflow: scroll;height:75%;border-radius: 5px;margin-left:15px;margin-top:15px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border: 4px solid lightgray;padding:5px; '>
                                     
                            <div    style='font-size:14px;font-weight:bold;border-radius: 0px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);background-image: linear-gradient(to right,  #000099, lightblue); color: white; border: 0px solid lightgray; padding:4px; margin:0;padding-left:14px;'>
                
                              Component Icon Editor
                            </div>

        
                            <canvas v-bind:id='"_canvas_" '
                                    v-bind:refresh='refresh'
                                    style="border: solid black 1px;margin-bottom: 10px;"
                                    v-on:mousemove='if (mousedown) {drawNow($event)}'
                                    v-on:mousedown='mousedown=true;drawNow($event)'
                                    v-on:mouseup='mousedown=false'
                                    v-bind:height='iconHeightPixels + "px"'
                                    v-bind:width='iconWidthPixels + "px"'
                            >
                            </canvas>

                            <div>
                              <div    v-for="color in colors"
                                      v-on:click='draw_color = color;'
                                      v-bind:style="'display: inline-block;width:15px;height:15px;background-color: ' + color">
                              </div>
        
        
        
        
        
                              <div    v-for="brush_size in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]"
                                      v-on:click='brush_width = brush_size;'
                                      v-bind:style="'display: inline-block;width:' + brush_size + 'px;height:' + brush_size +
                                                                      'px;background-color: ' + draw_color + ';border: black solid 1px ;margin-right: 2px;'">
                              </div>
                            </div>


                            <button    class="btn btn-dark"
                                       v-on:click="save">
                              Save
                            </button>




                  </div>


                      </div>
            `,
        mounted:    async function() {
        },
        methods:    {

            // editor interface
            getText:                            async function () {
                 // -----------------------------------------------------
                 //                      getText
                 //
                 // -----------------------------------------------------
                 if (!isValidObject(this.text)) {
                     return null
                 }

                 return this.text
             },
            setText:                            async function (  textValue  ) {

                /*
                ________________________________________
                |                                      |
                |             setText                  |
                |                                      |
                |______________________________________|
                This is called to set the component state
                __________
                | PARAMS |______________________________________________________________
                |
                |     textValue     Use the component code to find out what changes
                |     ---------     have been made to this code
                |________________________________________________________________________ */
                let mm     =  this
                this.text  = textValue
                if (!isValidObject(this.text)) {
                    return
                }

                this.baseComponentId        = yz.getValueOfCodeString(this.text, "base_component_id")

            },
            drawNow: function(event) {
                var mm= this
                var el = document.getElementById("_canvas_" )
                if (isValidObject(el)) {
                    var rect = el.getBoundingClientRect()
                    var left = (event.clientX - rect.left ) - mm.brush_width
                    var right = (event.clientY - rect.top) - mm.brush_width

                    var ctx = el.getContext("2d");
                    ctx.strokeStyle = mm.draw_color;
                    ctx.fillStyle = mm.draw_color;
                    ctx.fillRect(left,right,  mm.brush_width,  mm.brush_width)

                    this.icon_image_data = el.toDataURL()
                }
            },
            save: function() {
                let mm = this
                this.text = yz.deleteCodeString(this.text, "logo_url")
                this.text = yz.insertCodeString(this.text, "logo_url", this.icon_image_data)
                mm.$root.$emit('message', {
                    type:   "pending"
                })
            }
        }
    })
}
