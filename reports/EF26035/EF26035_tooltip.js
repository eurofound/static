/* Shared report tooltip interactions: hover, pin, toggle off, outside click, Escape. */
window.EFReportTooltip = function ({stage, tooltip, target, draw, clear=()=>{}, canShow=()=>true}) {
  let active=null, pinned=false, dismissed=null, timer=0;
  const markFor = element => element instanceof Element ? element.closest(target) : null;
  const cancel = () => clearTimeout(timer);
  function close({suppress=false}={}) {
    cancel();
    if(suppress) dismissed=active;
    if(active){active.classList.remove('is-active');active.setAttribute('aria-pressed','false');}
    tooltip.hidden=true;tooltip.dataset.pinned='false';active=null;pinned=false;clear();
  }
  function show(mark,event,pin) {
    if(!mark||!canShow(mark))return;
    cancel();
    if(active&&active!==mark){active.classList.remove('is-active');active.setAttribute('aria-pressed','false');}
    active=mark;pinned=pin;active.classList.add('is-active');
    active.setAttribute('aria-pressed',String(pin));
    draw(mark,event);tooltip.dataset.pinned=String(pin);
  }
  function preview(mark,event) {
    if(pinned||mark===dismissed)return;
    if(active===mark&&!tooltip.hidden){cancel();return;}
    show(mark,event,false);
  }
  function toggle(mark,event) {
    if(active===mark&&pinned){close({suppress:true});return;}
    dismissed=null;show(mark,event,true);
  }
  function scheduleClose(){cancel();if(!pinned)timer=setTimeout(()=>close(),160);}
  stage.addEventListener('pointerover',event=>preview(markFor(event.target),event));
  stage.addEventListener('pointermove',event=>preview(markFor(event.target),event));
  stage.addEventListener('pointerout',event=>{
    const from=markFor(event.target),to=markFor(event.relatedTarget);
    if(from&&from!==to){if(dismissed===from)dismissed=null;scheduleClose();}
  });
  stage.addEventListener('pointerleave',scheduleClose);
  stage.addEventListener('focusin',event=>preview(markFor(event.target)));
  stage.addEventListener('focusout',scheduleClose);
  stage.addEventListener('click',event=>{const mark=markFor(event.target);if(mark)toggle(mark,event);});
  stage.addEventListener('keydown',event=>{
    const mark=markFor(event.target);
    if(mark&&(event.key==='Enter'||event.key===' ')){event.preventDefault();toggle(mark);}
  });
  tooltip.addEventListener('pointerenter',cancel);
  tooltip.addEventListener('pointerleave',scheduleClose);
  document.addEventListener('pointerdown',event=>{
    if(!markFor(event.target)&&!tooltip.contains(event.target))close();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close({suppress:true});});
  return {close,preview,toggle,release(){pinned=false;dismissed=null;tooltip.dataset.pinned='false';active?.setAttribute('aria-pressed','false');}};
};
